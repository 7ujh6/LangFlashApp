import React, {useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import ProfileTab from '../profile-tab/profile-tab.component';
import {ProfileDropdownContainer, LabelContainer, DropdownLink} from './profile-dropdown.styles';
import {UserContext} from '../../providers/user/user.provider';
import {ProfileDisplayContext} from '../../providers/profile-display/profile-display.provider';
import {auth, createUserDocument } from '../../firebase/firebase.utils';
import 'firebase/firestore';

const ProfileDropdown = ({history}) => {

    const { currentUser } = useContext(UserContext), { friendsList } = currentUser;
    const {toggleHidden, activeFriends, fetchActiveFriends} = useContext(ProfileDisplayContext);



    //I'm pretty sure this is wrong somehow but I have yet to find out 
    useEffect (() => {
       friendsList.map(async friend => { 
        // const userRef = firestore.doc(`users/${userAuth.uid}`);

        //    console.log("getUserDoc", friend, await createUserDocument(friend));
            await createUserDocument(friend).get().onSnapshot(() => {
                fetchActiveFriends(friendsList);
        })
    })
    }, [friendsList, fetchActiveFriends])


    return <ProfileDropdownContainer>
        <LabelContainer onClick={() => { 
            toggleHidden();
            history.push('/');
            return auth.signOut()}}>Signout</LabelContainer>
        <DropdownLink onClick={toggleHidden} to="/browseusers">Browse Users</DropdownLink>
        <DropdownLink onClick={toggleHidden} to="/profile">View Profile</DropdownLink>
        {
            activeFriends.map(friend =>
                {
                    return <ProfileTab friend={friend} onClick={() => {
                        toggleHidden();
                        history.push(`/profile/:userId/${friend.currentUser.uid}`)}}/>
                }
            )
        }
    </ProfileDropdownContainer>;
}

export default withRouter(ProfileDropdown);