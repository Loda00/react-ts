import * as React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import axios, { AxiosResponse } from 'axios'
import './style.sass'

interface IProps {
    test1: string,
    test2: number
}

interface IThings {
    id: number,
    thing: string,
    price: number
}

interface IState {
    data: Array<IThings>,
    thing: string,
    price: number
}

interface IApp {

}

class App extends React.Component<IProps, IState> implements IApp {

    constructor(props: IProps) {
        super(props)

        this.state = {
            data: [{
                id: 0,
                thing: '',
                price: 0
            }],
            thing: '',
            price: 0
        }

        axios.defaults.baseURL = 'http://localhost:3002/data'
        // axios.defaults.headers.co    
        // taskkill /f /im node.exe  || killall node    
        this.handleCatchForm = this.handleCatchForm.bind(this)
        this.handleSendData = this.handleSendData.bind(this)
        
    }

    componentWillMount(): void {
        this.handleLoadData()
    }

    handleLoadData(): void {
        axios.get('/')
            .then((rs: AxiosResponse) => {
                console.log(rs.data)
                this.setState({ data: rs.data })
                this.handleClean()
            })
            .catch((e: Error) => console.log(e))
    }

    handleCatchForm = (e: any) => {

        const { name, value } = e.target

        console.log('asd', this.state.thing)
        this.setState({
            [name]: value
        } as IState)
    }

    handleSendData = (e) => {
        e.preventDefault()
        let id = parseInt((Math.random() * 1000).toString().split('.')[1]);
        const { thing, price } = this.state
        const data = {id, thing, price}
        console.log(data)
        axios
            .post('/', data)
            .then(rs => {
                console.log(1)
                this.handleLoadData()
                this.handleClean()
            })
            .catch(e => console.log(e))
    }

    handleDelete = (id) => {


        axios
            .delete(`/${id}`)
            .then(()=> {
                console.log('delete')
                this.handleLoadData()
            })
            .catch((e) => console.log(e))

    }

    handleClean () {
        this.setState({
            thing: '',
            price: 0
        })
    }


    render() {

        return (
            <div className="body">
                {/* <div className="title">
                    <h3>Typescript - React.js</h3>
                </div> */}
                <form onSubmit={this.handleSendData} className="formulario">
                    <h3>Formulario de Productos </h3>
                    <TextField value={this.state.thing} autoComplete="off" name="thing" onChange={this.handleCatchForm} label="Producto" />
                    <TextField value={this.state.price} autoComplete="off" name="price" onChange={this.handleCatchForm} label="Precio" />
                    <input name="Agregar" type="submit" />
                </form>
                <Table className="tabla">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.data.map((d: IThings, index: number) => {
                                return (
                                    <TableRow key={d.id}>
                                        <TableCell>{d.thing}</TableCell>
                                        <TableCell>$ {d.price}</TableCell>
                                        <TableCell><Edit /></TableCell>
                                        <TableCell><Delete onClick={() => this.handleDelete(d.id)} /></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        )

    }
}

export default App