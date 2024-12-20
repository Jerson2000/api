import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user-entity";

@Entity()
export class OTP {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column({ default: 300 }) // Duration in seconds (5 minutes)
    validityDuration: number; // Validity duration in seconds

    @UpdateDateColumn()
    createdAt: Date;

    @OneToOne(() => Users)
    @JoinColumn()
    user: Users

    /**
     * Checks if the OTP is still valid based on its creation time and validity duration.
     * @returns {boolean} True if the OTP is valid; otherwise, false.
     */
    isValid(): boolean {
        const now = new Date();
        const expirationTime = new Date(this.createdAt.getTime() + this.validityDuration * 1000);
        return now < expirationTime; // Returns true if current time is less than expiration time
    }
}
