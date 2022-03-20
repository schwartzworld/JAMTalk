class Email {
    public data: any;
    constructor(data: any) {
        this.data = data;
    }
    static fetch = async (): Promise<Email> => {
        return new Email('someData')
    }
}
export default Email
