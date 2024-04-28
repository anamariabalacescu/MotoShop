import ServerProvider from "./ServerProvider";
import MotorType  from "../schemas/MotorType";

export default class MotorTypeProvider extends ServerProvider {
    getSubRoute() {
        return '/motorTypes'
    }

    /**
     * 
     * @param {string} id /
     * @returns {Array<MotorType>}
     */
    async getAll() {
        const response = await this.get(this.getSubRoute())
        return response.map((motorType) => MotorType.fromJson(motorType))
    }

    /**
     * 
     * @param {MotorType} MotorType
     * @returns {MotorType}
     */

    async create(motorType) {
        const response = await this.post(this.getSubRoute(), motorType.toJson())
        return MotorType.fromJson(response)
    }
}