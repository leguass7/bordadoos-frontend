import { PrismaClient, Client, EmbroideryType, EmbroideryPosition, Prisma } from '@prisma/client'
import { cnpj } from 'cpf-cnpj-validator'
// import { parse } from 'date-fns'
import { company, phone } from 'faker/locale/pt_BR'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'

// import { categories } from './seeds/categories'
import { embroideryTypes, embroideryPositions } from './seeds/emboideryTypes'
import { users } from './seeds/users'

// function genDate(str: string) {
//   return parse(str, 'yyyy-MM-dd', new Date())
// }

// function compareValues<T = unknown>(key: keyof T, order = 'asc') {
//   return function innerSort(a: any, b: any) {
//     if (!(key in a) || !(key in b)) return 0
//     const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
//     const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

//     let comparison = 0
//     if (varA > varB) {
//       comparison = 1
//     } else if (varA < varB) {
//       comparison = -1
//     }
//     return order === 'desc' ? comparison * -1 : comparison
//   }
// }

// function randomInt(min: number, max: number): number {
//   const m = Math.ceil(min)
//   return Math.floor(Math.random() * (Math.floor(max) - m + 1)) + m
// }

const prisma = new PrismaClient()
const savePath = resolve(__dirname, '../docs', 'seeds')

function saveToJson(fileName: string, list: any[]) {
  writeFileSync(fileName, JSON.stringify(list), { encoding: 'utf-8' })
}

function generateEmbroideries() {
  const file = join(savePath, 'embroidery_types.json')
  const hasFile = existsSync(file)
  if (hasFile) {
    const rawdata = readFileSync(file, { encoding: 'utf-8' })
    return JSON.parse(rawdata) as EmbroideryType[]
  }
  const emTypes = embroideryTypes.map(emb => ({ ...emb, createdBy: 1 }))
  saveToJson(file, emTypes || [])
  return emTypes
}

function generateEmbroideryPositions() {
  const file = join(savePath, 'embroidery_positions.json')
  const hasFile = existsSync(file)
  if (hasFile) {
    const rawdata = readFileSync(file, { encoding: 'utf-8' })
    return JSON.parse(rawdata) as EmbroideryPosition[]
  }
  const emTypes = embroideryPositions.map(emb => ({ ...emb, createdBy: 1 }))
  saveToJson(file, emTypes || [])
  return emTypes
}

const generateClients = (max = 10): Partial<Client>[] => {
  const generate = () => {
    const result: Partial<Client>[] = []
    for (let i = 0; i < max; i++) {
      result.push({
        id: i + 1,
        name: company.companyName(),
        doc: cnpj.generate(),
        actived: true,
        phone: phone.phoneNumber('(85) ####-####'),
        createdBy: 1
      })
    }
    return result
  }

  const file = join(savePath, 'clients.json')
  const hasFile = existsSync(file)
  if (hasFile) {
    const rawdata = readFileSync(file, { encoding: 'utf-8' })
    return JSON.parse(rawdata)
  }
  const list = generate()
  saveToJson(file, list || [])
  return list
}

async function main() {
  await Promise.all(
    users.map(async user => {
      await prisma.user.upsert({ where: { email: user.email }, update: user, create: user })
    })
  )

  const clients = generateClients(50)

  await Promise.all(
    clients.map(async client => {
      const where = client?.id ? { id: client.id } : { cnpj: client.doc }
      await prisma.client.upsert({ where, update: client, create: client as Client })
    })
  )

  await Promise.all(
    generateEmbroideries().map(async emb => {
      await prisma.embroideryType.upsert({ where: { id: emb?.id }, update: emb, create: emb as EmbroideryType })
    })
  )

  await Promise.all(
    generateEmbroideryPositions().map(async emb => {
      await prisma.embroideryPosition.upsert({
        where: { id: emb?.id },
        update: emb,
        create: emb as EmbroideryPosition
      })
    })
  )
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('END')
    await prisma.$disconnect()
  })
