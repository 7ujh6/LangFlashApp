import React, {createContext, useState} from 'react';
import {filterActiveFriends} from '../../firebase/firebase.utils';

export const ProfileDisplayContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    activeFriends: [],
    fetchActiveFriends: () => {}

});



const ProfileDisplayProvider = ({children}) => {
    const [hidden, setHidden] = useState(true);
    const [activeFriends, setActiveFriends] = useState([]); 
    const fetchActiveFriends = (friendsList) => setActiveFriends(filterActiveFriends(friendsList));
    const toggleHidden = () => {setHidden(!hidden)};


    return <ProfileDisplayContext.Provider value={{hidden, activeFriends, fetchActiveFriends, toggleHidden}}>{children}</ProfileDisplayContext.Provider>
}

export default ProfileDisplayProvider;