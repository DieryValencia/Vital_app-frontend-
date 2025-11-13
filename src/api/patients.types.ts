// Types para Pacientes
export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export type BloodType = 
  | 'A_POSITIVE'
  | 'A_NEGATIVE'
  | 'B_POSITIVE'
  | 'B_NEGATIVE'
  | 'AB_POSITIVE'
  | 'AB_NEGATIVE'
  | 'O_POSITIVE'
  | 'O_NEGATIVE'

export interface Patient {
  id: number
  firstName: string
  lastName: string
  identificationNumber: string
  dateOfBirth: string
  gender: Gender
  phoneNumber: string
  email: string
  address: string
  bloodType: BloodType
  allergies: string
  medicalConditions: string
  createdAt: string
  updatedAt: string
}

export interface PatientCreateInput {
  firstName: string
  lastName: string
  identificationNumber: string
  dateOfBirth: string
  gender: Gender
  phoneNumber?: string
  email?: string
  address?: string
  bloodType?: BloodType
  allergies?: string
  medicalConditions?: string
}

export interface PatientUpdateInput {
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  gender?: Gender
  phoneNumber?: string
  email?: string
  address?: string
  bloodType?: BloodType
  allergies?: string
  medicalConditions?: string
}

export interface PageResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  empty: boolean
}