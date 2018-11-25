import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import "./ListView.scss";

class ListView extends Component {

    static propTypes = {
        enableHeader : PropTypes.bool
    }

    static headerIndex = 0

    static defaultProps = {
        enableHeader: true
    }

    render() {
        var rows = this.props.rows,
            rowParser = this.props.rowParser,
            headerRow;

        if(rows.length > 0) {
            var firstRow = rowParser(rows[0]);
            headerRow = {
                id: "header"+ListView.headerIndex++,
                header: true,
                cells: firstRow.cells.map(cell => {
                    var headerCell = {...cell};
                    if(cell.icon) {
                        headerCell.cls = "invisible";
                    }
                    headerCell.content = headerCell.colHeader || "";
                    return headerCell;
                })
            };
        }
        console.log(headerRow);

        return ( 
            <ul className = 'my-list' >
                <Row  {...headerRow} />
                { rows.map( row => <Row  {...rowParser(row)} />)}
            </ul>
        );
    };
}

export default ListView;