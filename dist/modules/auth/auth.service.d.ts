import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
