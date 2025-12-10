import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    private readonly saltRounds = 12;
    //hasher
    async hashear(password: string): Promise<string> { 
        const hash = await bcrypt.hash(password, this.saltRounds);
        return hash;
    }
    //comparar un hash y un password
    async comparar(password: string, hash: string): Promise<boolean> { 
        return await bcrypt.compare(password, hash);
    } 
} 