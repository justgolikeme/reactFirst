import React,{useEffect, useState} from 'react'
import {Button,Form,Input, Popconfirm, Table, Modal,InputNumber, Select, DatePicker} from 'antd'
import './user.css'
import {addUser, editUser, getUser} from '../../api'
import dayjs from 'dayjs'
const User=()=>{
    const [ listData, setListData ] = useState({
        name:''
    })
    const [ tableData, setTableData ] = useState([])
    //0新增 1编辑
    const [modalType, setModalType] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    //创建form实例
    const [form] = Form.useForm();
    //按新增和编辑按钮后
    const handleClick = (type,rowData)=>{
        setIsModalOpen(!isModalOpen)
        if(type == 'add'){
            setModalType(0)
        }else{
            setModalType(1)
            //进行深拷贝
            console.log(rowData,"rowData")
            const cloneData = JSON.parse(JSON.stringify(rowData))
            cloneData.birth = dayjs(cloneData.birth)
            //表单数据回填
            form.setFieldsValue(cloneData)
        }
    }
    //输入框中输入数据后按搜索会把输入框中的值返回到handleFinish的e中
    const handleFinish =(e)=>{
        setListData({
            name: e.name
        })
        console.log(e)
    }

    //删除
    const handleDelete = (rowData) => {

    }
    //Table分为两步，首先是获取Table数据源，然后是Table的显示效果
    //table的数据是通过接口返回的，需要在页面首次加载的时候去请求当前的数据接口
    //页面首次加载是通过useEffect来模拟的
    const getTableData = ()=> {
        getUser(listData).then(({data}) => {
            console.log(data.list, 'res')   //列表接口有id，id代表当前数据的标识，在编辑的时候需要把标识id传给后端，后端需要通过这个id找到数据修改对应的内容
            setTableData(data.list)
        })
    }

    //弹窗确定
    const handleOk = () => {
        //表单校验
        form.validateFields().then( (val) => {
            // console.log(val,"val")
            //日期参数
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            console.log(val,"newval")
            //调接口,根据当前的状态进行判断
            if(modalType){  //编辑是修改原数据，先找到原数据，一般是通过标识id找，后端返回当前数据时，会传给我们标识
                editUser(val).then(() => {
                    handleCancel()
                    getTableData()    //更新列表的数据
                })
            }else{
                //新增完成之后需要关闭弹窗,对表单的数据进行重置,然后更新列表的数据
                addUser(val).then(() => {
                    handleCancel()
                    getTableData()    //更新列表的数据
                })
            }
        }).catch((err) => {
            console.log(err)
        })

        
    };
    //弹窗取消
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
    };


    const columns = [
        {
            title: '姓名',
            dataIndex: 'name' 
        },{
            title: '年龄',
            dataIndex: 'age'
        },{
            title: '性别',
            dataIndex: 'sex',
            render: (val) => {
                return val ? '女':'男'
            }
        },{
            title: '出生日期',
            dataIndex: 'birth'
        },{
            title: '地址',
            dataIndex: 'addr'
        },{
            title: '操作',
            render: (rowData) =>{
                return(
                    <div className="flex-box">
                        <Button style={{marginRight:'5px'}} onClick={()=>handleClick('edit',rowData)}>编辑</Button>
                        <Popconfirm 
                            type="提示" 
                            description="此操作将删除该用户，是否继续"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => handleDelete(rowData)}
                        >
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        //调用后端接口获取用户列表数据，现在是调用mock
        getTableData()
    },[])



    return(
        //首先实现顶部的form表单 新增的按钮
        <div className="user">
            <div className="flex-box space-between">
                {/* 提交新增用户时，第一步需要获取当前表单的数据，第二步需要调接口实现列表数据的更新
                获取表单的数据，是利用form属性，调用对应的api,获取当前表单输入的内容
                执行弹窗后，点击表单确认，执行表单校验 */}
                <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
                <Form layout="inline" onFinish={handleFinish}>
                    <Form.Item name="keyword">
                        <Input placeholder="请输入用户名"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table columns={columns} dataSource={tableData} rowKey={'id'}/>
            {/* 弹窗要做成复用性的，要根据状态来改变model的标题 */}
            <Modal
                open={isModalOpen}
                title={modalType? '编辑用户' : '新增用户'}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form 
                    // 需要拿到form实例，传递form属性，对应的属性值需要利用钩子函数，钩子函数是antd提供的，后面就可以利用form属性调用重置的方法
                    form={form}
                    labelCol={{
                        span:6
                    }}
                    wrapperCol={{
                        span:18
                    }}
                    labelAlign="left"
                >
                    {/* rowData是没有id的，所以需要手动添加 ,如果是编辑，就显示这个表单域，点击数据提交时，就会有id数据这个字段 */}
                    {
                        modalType == 1 && 
                        <Form.Item
                        name="id"
                        hidden
                        >
                            <Input/>
                        </Form.Item>
                    }

                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required:true,
                                message:'请输入姓名'
                            }
                        ]}
                    >
                        <Input placeholder='请输入姓名'/>
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[
                            {
                                required:true,
                                message:'请输入年龄'
                            },
                            {
                                type:'number',
                                message:'年龄必须是数字'
                            }
                        ]}
                    >
                        <InputNumber placeholder='请输入年龄'/>
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[
                            {
                                required:true,
                                message:'性别是必选'
                            }
                        ]}
                    >
                        <Select
                            options={[
                                {value:0,label:'男'},
                                {value:1,label:'女'}
                            ]} placeholder="请选择性别"
                        />
                    </Form.Item>
                    <Form.Item
                        label="出生日期"
                        name="birth"
                        rules={[
                            {
                                required:true,
                                message:'请选择出生日期'
                            }
                        ]}
                    >
                        <DatePicker placeholder="请选择" format="YYY/MM/DD"/>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="addr"
                        rules={[
                            {
                                required:true,
                                message:'请填写地址'
                            }
                        ]}
                    >
                        <Input placeholder='请输入地址'/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User


// 编辑用户时，第一步是打开弹窗的时候对原数据进行回显，然后进行修改，确定后调用编辑的接口实现列表数据的更新