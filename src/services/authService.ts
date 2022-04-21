import * as usersRepository from '../repositories/usersRepository.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function signIn(userData: usersRepository.InsertUser) {
  const { email } = userData
  const existingUser = await usersRepository.findByEmail(email)
  if (!existingUser)
    throw { type: 'Conflict', message: 'Dados Invalidos' }

  if (existingUser.password !== userData.password) {
    throw { type: 'Conflict', message: 'Senha Invalida' }
  }

  const existingSession = await usersRepository.tokenById(existingUser.id)
  let token = ''
  if (existingSession) {
    token = existingSession.token
  } else {
    const key = process.env.JWT_SECRET
    token = jwt.sign(email, key)
    await usersRepository.token(token, existingUser.id)
  }
  return token
}

export async function signUp(userData: usersRepository.InsertUser) {
  const existingUser = await usersRepository.findByEmail(userData.email)
  if (existingUser)
    throw { type: 'Conflict', message: 'Email já cadastrado' }
  await usersRepository.insert(userData)
}