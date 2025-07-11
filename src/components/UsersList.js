import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";

function UsersList(){
    const [doFetchUsers,isLoadingUsers,loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser,isCreatingUser,creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    })

    console.log("outer");

    useEffect(() => {
        console.log("inner");
        doFetchUsers();
    },[doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    if(isLoadingUsers){
        return <Skeleton times={2} className='h-10 w-full'/>
    }

    if(loadingUsersError){
        return <h2>Error occured in fetching data...</h2>
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>
                    + Add User
                </Button>
                {
                    creatingUserError && "Error Creating User..."
                }
            </div>
            {renderedUsers}
        </div>
    );
}

export default UsersList;