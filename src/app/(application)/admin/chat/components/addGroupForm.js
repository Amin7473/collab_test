import { Button, Group, Menu, Modal, MultiSelect, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import Scrollbars from 'react-custom-scrollbars-2';
import { Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { closeAddPopup } from '@/common/store/slices/common';
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { useGetUsers } from '../hooks/useGetUsers';
import { usePostGroup } from '../hooks/useCreateGroup';

const categories = [
    "Danger",
    "Warning",
    "Success",
    "Info"
]


function AddGroupForm(){
  const {
        register,
        control,
        handleSubmit,
        reset,
        trigger,
        setError,
        watch,
        setValue,
        formState: { errors },
      } = useForm();
      const dispatch = useDispatch();
      const popup = useSelector((state) => state.common.addPopup);
      const handleClose = () => {
        dispatch(closeAddPopup());
        reset();
      };
      const { data: users } = useGetUsers({});
      const userData = users?.results?.map(item => ({label : item.username, value : String(item.id)}))
      console.log("userData", userData)

      const {
        mutate: createGroup,
        isSuccess: createGroupSuccess,
        isError: createGroupError,
        error: createGroupErrors,
      } = usePostGroup();

      const onSubmit = (data) => {
        console.log(errors)
        console.log("INside on submit")
        const obj = {
            group_name : watch("group_name"),
            users : watch("users"),
        }
        
        console.log("after dta")
        console.log(obj)
        createGroup(obj);
        console.log("rwall")
        dispatch(closeAddPopup());
        reset();
        return data;
      };
      return (
        <Modal
          title = "Create Group"
          closeOnClickOutside={true}
          removeScrollProps={{
            allowPinchZoom: true, // Allow pinch to zoom on mobile devices
          }}
          overlayProps={{
            blur: 1,
            opacity: 1.8,
          }}
          size='35rem'
          withCloseButton={true}
          opened={popup.status}
          onClose={handleClose}
          centered
          classNames={{
            root: '',
            body: '!w-full !rounded-full',
            header : '!px-10 !bg-primary-card',
            title : '!text-[1.7rem]',
            content : '!py-8 !bg-primary-card',
            close : '!rounded-[50%] hover:!bg-orange-500 hover:!text-white'
          }}
          fullScreen={false}
        >
          <form className='flex flex-col flex-auto w-[100%] text-white'>
            <div className='flex flex-col gap-y-5 p-4 md:p-7 rounded-lg'>
                <Controller
                name='group_name'
                control={control}
                rules={{
                    required: 'Group name is required!',
                }}
                render={({ field }) => (
                    <TextInput
                    {...field}
                    label='Group Name'
                    placeholder='Enter group name'
                    withAsterisk
                    error={''}
                    classNames={{
                        label: '!font-medium md:!text-base !text-primary-gray !mb-2',
                        input: 'md:!h-[3rem] !rounded-lg md:!text-base !text-dune !text-white !border-1 focus:!border-orange-500 !border-[#464547]',
                    }}
                    />
                )}
                />

              <Controller
                name='users'
                control={control}
                rules={{
                    required: 'Users are required',
                }}
                render={({ field }) => (
                    <MultiSelect
                    {...field}
                    label='Members'
                    placeholder='Select group members'
                    withAsterisk
                    error={''}
                    data ={userData}
                    searchable
                    classNames={{
                        label: '!font-medium md:!text-base !text-primary-gray !mb-2',
                        input: 'md:!h-[3rem] !rounded-lg md:!text-base !text-dune !text-white !border-1 focus:!border-orange-500 !border-[#464547] !py-3',
                        option : '!bg-white hover:!bg-gray-300 hover:!text-primary-card',
                        options : '!bg-white'
                    }}
                    />
                )}
                />

            </div>
            <Button
                // leftSection={<img src="/assets/icons/add.svg" alt="add" />}
                classNames={{
                root: "!bg-orange-500 !px-6 !py-4 !rounded-full !w-[200px] !h-full !ml-[32%] !mt-3",
                label: "!font-semibold !text-white !text-[1.1rem]",
                }}
                onClick={onSubmit}
            >
                Submit
            </Button>
        </form>
        </Modal>
      );
}

export default AddGroupForm