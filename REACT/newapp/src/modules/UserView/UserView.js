import React, { Component} from 'react';
import {startCase} from 'lodash';
import ListView from './ListView';

class UserView extends Component {
    
    state = {
        loading : true
    }

    loadData = () => {
        this.setState({ loading : false });
    }

    render() {

        let listConfig = {
            rows : this.props.listdata,
            rowParser: function(rowObj) {
                var cells = [];

                cells.push({
                    icon: true,
                    src: rowObj.picture.thumbnail,
                    alt: 'no pic'
                });
                cells.push({
                    cls: "name",
                    colHeader: "Username",
                    content: startCase(`${rowObj.name.title}. ${rowObj.name.first} ${rowObj.name.last}`)
                });
                cells.push({
                    colHeader: "Age",
                    content: rowObj.dob.age
                });

                return {
                    id : `${rowObj.id.name}:${rowObj.id.value}`,
                    cells : cells
                };
            }
        };
        return (
            <ul>
                {
                    this.state.loading ? <li>Loading...</li> : <ListView {...listConfig} />
                }
                <button onClick={this.loadData }> Load</button>
            </ul>
        );
    }
}

export default UserView;