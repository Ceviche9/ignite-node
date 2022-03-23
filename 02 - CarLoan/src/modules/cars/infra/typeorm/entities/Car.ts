import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import {v4 as uuidV4} from "uuid"
import { Category } from "./Category"
import { Specification } from "./Specification"

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  available: boolean

  @Column()
  daily_rate: number

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  brand: string

  // Vários carros podem ter a mesma categoria
  // Então esse mapeamento é: MANY TO ONE
  @ManyToOne(() => Category)
  @JoinColumn({name: "category_id"})
  category: Category

  @Column()
  category_id: string

  // Um carro pode ter mais de uma especificação.
  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    // Qual coluna pertence a essa classe de Carro. (car_id)
    joinColumns: [{name: "car_id"}],
    // Colocar a mesma que tá no ManyToMany.
    inverseJoinColumns: [{name: "specification_id"}]
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
      this.available = true
    }
  }
}

export { Car }