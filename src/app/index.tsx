interface ITest {
    test1: string
}


class Test implements ITest {

    test1 = 'Juanito'

    constructor(){
        this.load()
    }

    load () {
        console.log(`asdsad ${this.test1}`)
    }
}

new Test()
