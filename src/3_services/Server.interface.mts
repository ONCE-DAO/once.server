export default interface Server {
    start(...args: any[]): Promise<any>
}