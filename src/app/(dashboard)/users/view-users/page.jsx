"use client";
import React,{ useEffect, useState,Fragment } from "react";
import Image from "next/image";
import TableComponent from "../../../../Components/ui/table";
import ModalComponent from "../../../../Components/Modal/Modal";
import { Alerts } from "../../../../Components/atomics";
import { Menu, Switch, Transition } from '@headlessui/react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const deleteUserHandler = (userId) => {
  const url = `https://techc2.be/admin/user/delete/${userId}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("User deleted successfully");
        toast.success("Data deleted")
        fetchall();
      } else {
        console.log("Error deleting user");
        toast.error("Error while deleting data")
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const renderImageCell = (rowData) => {
  return rowData.images?.map((image, index) => (
    <div key={index} style={{ display: "flex", alignItems: "center" }}>
      {image && 
      <Image
        src={image}
        alt="User"
        width={50}
        height={50}
        style={{ marginRight: "5px" }}
      />}
    </div>
  ));
};






// const headerData = [
//   {
//     key: "sr.no",
//     label: "Sr no",
//   },
//   {
//     key: "images",
//     label: "Image",
//     renderCell: renderImageCell,
//   },
//   {
//     key: "name",
//     label: "Username",
//   },
//   {
//     key: "userid",
//     label: "User Id",
//   },
//   {
//     key: "mobile",
//     label: "Phone",
//   },
//   {
//     key: "diamonds",
//     label: "Diamonds",
//   },
//   {
//     key: "status",
//     label: "Status",
//     renderCell: (rowData: UserData) => (
//       <span className={`${rowData?.status === "Active" ? "text-green-500" : "text-red-500"}`}>
//         {rowData?.status}
//       </span>
//     ),
//   },
  
//   {
//     key: "action",
//     label: "Action",
//     renderCell: (_, index : any) => renderActionCell(index),
//   }
// ];



const ViewUser = () => {
  const [userData,setUserData] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const router = useRouter();
  const [openDeleteModal, setIsOpenDeleteModal]=useState(false);
  const [openAlertsSuccess, setOpenAlertsSuccess] = useState(false);
  const handleDeleteModal=(id)=> {
    setIsOpenDeleteModal(true)
  }
  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://fun2fun.live/user/getall`);
      const data = await response?.json();
      const modifiedData = data?.data?.map((user, index) => ({
        ...user,
        "sr.no": index + 1,
        name: user.name || "-",
        mobile: user.mobile || "-",
        status: user.is_active_userId == true ? 'Active' : 'Inactive',
        userid: user.userId || "-"
      }));
      setUserData(modifiedData);
      setIsLoading(false);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const handleActive = async (checked, id) => {
    try {
      const response = await fetch("https://fun2fun.live/admin/user/banUserId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          is_active_userId: checked,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const updatedData = await response.json();
  
      // Find the index of the user in the existing userData array
      const index = userData.findIndex((user) => user._id === updatedData?.data?._id);
  
      if (index !== -1) {
        // Update the user data at the found index with the updated user data
        setUserData((prevUserData) => {
          const newData = [...prevUserData];
          newData[index] = {
            ...newData[index], // Keep existing properties
            is_active_userId: updatedData?.data?.is_active_userId, // Update is_active
            status: updatedData?.data?.is_active_userId ? "Active" : "Inactive", // Update status
          };
          return newData;
        });
      } else {
        console.error(`User with _id ${updatedData?.data?._id} not found in userData array.`);
      }
    } catch (error) {
      console.error("Error toggling user Live ban:", error);
    }
  };
  

  const renderActionCell = (index,user) => {
    return (
      <Menu as="div" className="relative inline-block text-left">
  <div>
    <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-lime-400">
      <span>Action</span>
      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </Menu.Button>
  </div>
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
      <div className="py-1" role="none">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={() => router.push(`/users/view-users/view-user/${user?._id}`)}
            >
              View
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
              onClick={() => 
                
                
                router.push(`/users/view-users/edit-user/${user?._id}`)}

                
              // onClick={()=>{setIsOpenEditModal(true)}}
            >
              Edit
            </button>
          )}
        </Menu.Item>
        {/* <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
              onClick={() => handleDeleteModal(deleteUserHandler(user?.userId))}
            >
              Delete
            </button>
          )}
        </Menu.Item> */}
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-3"
              onClick={() => router.push(`/users/recieved-gift-history/${user?._id}`)}
            >
              Recieved Gift History
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-4"
              onClick={() => router.push(`/users/send-gift-history/${user?._id}`)}
            >
              Send Gift History
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-5"
              onClick={() => router.push(`/users/coin-history/${user?._id}`)}
            >
              Coin History
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } block px-4 py-2 text-sm w-full text-left`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-6"
              onClick={() => router.push(`/users/live-user-history/${user?._id}`)}
            >
              Live History
            </button>
          )}
        </Menu.Item>
        
      </div>
    </Menu.Items>
  </Transition>
</Menu>

    );
  };
  
  const headerData = [
    {
      key: "sr.no",
      label: "Sr no",
    },
    {
      key: "images",
      label: "Image",
      renderCell: renderImageCell,
    },
    {
      key: "name",
      label: "Username",
    },
    {
      key: "is_active_userId",
      label: "Active/Deactive",
      renderCell: (rowData) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={rowData.is_active_userId}
            onChange={(event) => handleActive(event.target.checked, rowData?.userId)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-netral-25 dark:peer-focus:ring-netral-25 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-netral-25"></div>
        </label>
      ),
    
    },
    
    {
      key: "userid",
      label: "User Id",
    },
    {
      key: "mobile",
      label: "Phone",
    },
    {
      key: "diamonds",
      label: "Diamonds",
    },
     {
    key: "status",
    label: "Status",
    renderCell: (rowData) => (
      <span className={`${rowData?.status === "Active" ? "text-green-500" : "text-red-500"}`}>
        {rowData?.status}
      </span>
    ),
  },
    {
      key: "action",
      label: "Action",
      renderCell: (_, index) => renderActionCell(index,_),
    }
  ];

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      // If the search term is empty or whitespace, fetch the data again to reset the table
      fetchData();
    } else {
      const filteredData = userData?.filter((user) =>
        user?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserData(filteredData); // Update userData state with filtered results
    }
  }

  return (
  <>
    <TableComponent 
    // handleSearch={handleSearch}  
    isLoading={isLoading} data={userData} headers={headerData} title="View Users" />
    <ModalComponent
        onAction={()=>{}}
        isOpen={openDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        size="2xl"
      >
        <div>
          <div className="p-12 flex justify-center w-full  text-white text-[20px]">
            <p className="text-white text-[20px]">
              Are You Sure You Want to Delete?
            </p>
          </div>
        </div>
      </ModalComponent>
      <Alerts
        variant='success'
        open={openAlertsSuccess}
        setOpen={setOpenAlertsSuccess}  
        title='Edit'
        desc='Data is Edited Successfully!'
      />
    </>
  );
};

export default ViewUser;
