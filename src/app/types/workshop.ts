export interface Workshop {
    _id: { $oid: string }
    wid: string
    image: string
    alteredFee: number
    actualFee: number
    assnName: string
    workName: string
    date: string
    hall: string
    time: string
    c1Name: string
    c1Num: string
    c2Name: string
    c2Num: string
    maxCount: string
    closed: boolean
    desc: string
    prerequisites: string
    agenda: Array<Array<{ time: string; description: string[] }>>
    earlyBirdActive: boolean
    one_line_desc: string
}

