import { IsNotEmpty, IsString } from "class-validator";

export class CreateDreamDto {

    @IsNotEmpty({message: "Название обязательно для заполнения"})
    @IsString()
    name: string;

    @IsNotEmpty({message: "Описание обязательно для заполнения"})
    @IsString()
    description: string;

    avatarUrl?: string;
}   
