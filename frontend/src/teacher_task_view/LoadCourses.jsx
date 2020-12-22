import React from 'react';

export default () => {
    this.state = {
        data: [],
        loading: true,
        error: false
    }
    /*fetch('http://localhost:3000/teachers/courses')
        .then(res => {
            if(!res.ok){
                throw res;
            }
            return res.json();
        })
        .then(data => {
            this.setState({loading: false, data});
        })
        .catch(err => {
            console.error(err);
            this.setState({loading: false, error: true});
        });*/
    return(
        <div>
            <h2>Courses</h2>
            {this.state.loading ? <p>Loading Courses</p>
                : this.state.error ? <p>Error Loading</p>
                    : (
                        <ul>
                            {this.state.data.map(course => <li>{course}</li>)}
                        </ul>
                    )
            }
        </div>
    );
}