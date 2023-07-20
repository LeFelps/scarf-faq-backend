export interface Question {
    _id: string
    title: string
    description: string
    parent: string | null
    __v: number
    children?: Question[]
}