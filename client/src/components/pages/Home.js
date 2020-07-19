import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {loadUser} from '../../store/actions/authActions';


function Home({auth:{isAuthenticated}, props:{history}, loadUser}) {
    useEffect(() => {
        if (isAuthenticated) {
            loadUser();  
        } else {
            history.push('/login');
        };
        // eslint-disable-next-line
    }, [isAuthenticated]);

        return (
            <div className="grid-2">
                <div>
                    
                </div>
                <div>
                    
                </div>
            </div>
        )
};


const mapStateToProps = (state, ownProps) => ({
    auth: state.authReducer,
    bookState: state.bookReducer,
    props: ownProps
})

export default connect(mapStateToProps, {loadUser})(Home)