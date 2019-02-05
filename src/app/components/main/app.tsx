import * as React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
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
    data: Array<IThings>
}

interface IApp {
    
}

class App extends React.Component<IProps,IState> implements IApp {

    constructor(props : IProps){
        super(props)

        this.state = {
            data : [{
                id: 0,
                thing: "",
                price: 0
            }]
        }

        axios.defaults.baseURL = 'http://localhost:3002/data'
    }

    componentWillMount () {
        this.handleLoadData()
    }

    handleLoadData (): void {
        axios.get('/')
        .then((rs: AxiosResponse) => {
            console.log(rs.data)
            this.setState({data: rs.data})
        })
        .catch((e: Error) => console.log(e))
    }

    render(){
        
        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.data.map((d: IThings, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{d.thing}</TableCell>
                                        <TableCell>${d.price}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </React.Fragment>
        )

    }
}

export default App