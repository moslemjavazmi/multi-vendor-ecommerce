import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsImages } from 'react-icons/bs'

import { IoCloseSharp } from 'react-icons/io5'

const AddProduct = () => {
    const categorys =[
            {
                name: 'category1',
                id: 1
            },
            {
                name: 'category2',
                id: 2
            },
            {
                name: 'category3',
                id: 3
            },
            {
                name: 'category4',
                id: 4
            },
            {
                name: 'category5',
                id: 5
            },
        ]

    
    const [state, setState] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    })
    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    
    }
   const handleSubmit = (e) => {
       e.preventDefault()
    //    console.log(state)

      
   }
    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
    const inmageHandle = (e) => {
        const files = e.target.files;
        const length = files.length;
        if(length > 0){
            setImages([
                ...images,
                ...files
            ])
            let imageUrl = []
            for(let i = 0; i < length; i++){
                imageUrl.push(URL.createObjectURL(files[i]))
            }
            setImageShow([
                ...imageShow,
                ...imageUrl
            ])
        }
        console.log(images)
        console.log(imageShow)
    }
    const changeImage=(img, index)=>{
        if (img) {
            let tempUrl = imageShow;
            let tempImages = images;
            tempImages[index] = img
            tempUrl[index] = { url: URL.createObjectURL(img) }
            setImageShow([...tempUrl])
            setImages([...tempImages])
        }
    }
    const removeImage = (index) => {
        const filterImage = images.filter((img, i) => i !== index)
        const filterUrl = imageShow.filter((url, i) => i !== index)
        setImages(filterImage)
        setImageShow(filterUrl)
    }
    return (
        <div className='px-2 lg:px-7 pt-5 '>
            <div className='w-full p-4  bg-dashboard-mode rounded-md'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add Product</h1>
                    <Link className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 ' to='/seller/dashboard/products'>Products</Link>
                </div>
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="name">Product name</label>
                                <input onChange={handleInputChange} value={state.name} className='px-4 py-2 focus:border-indigo-500 outline-none blue-mode border border-slate-700 rounded-md text-[#d0d2d6]'  type="text" placeholder='product name' name='name' id='name' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="brand">Product brand</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none blue-mode border border-slate-700 rounded-md text-[#d0d2d6]'  type="text" placeholder='product brand' name='brand' id='brand' />
                            </div>
                        </div>


                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="price">Price</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none blue-mode border border-slate-700 rounded-md text-[#d0d2d6]' type="number" placeholder='price' name='price' id='price' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="discount">Discount</label>
                                <input min='0' className='px-4 py-2 focus:border-indigo-500 outline-none blue-mode border border-slate-700 rounded-md text-[#d0d2d6]' type="number" placeholder='%discount%' name='discount' id='discount' />
                            </div>
                        </div>
                        <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
                            <label htmlFor="description">توضیحات تکمیلی</label>
                            <textarea name="description" id="description" className='px-4 py-2 focus:border-indigo-500 outline-none blue-mode border border-slate-700 rounded-md text-[#d0d2d6] mt-5'></textarea>
                        </div>
                        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4'>
                            {
                                imageShow.map((img, i) => <div className='h-[180px] relative'>
                                    <label htmlFor={i}>
                                        <img className='w-full h-full rounded-sm' src={img.url} alt="" />
                                    </label>
                                    <input onChange={(e) => changeImage(e.target.files[0], i)} type="file" id={i} className='hidden' />
                                    <span onClick={() => removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'><IoCloseSharp /></span>
                                </div>
                                )
                            }
                            <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]' htmlFor="image">
                                <span><BsImages /></span>
                                <span>select image</span>
                            </label>
                            <input multiple onChange={inmageHandle} className='hidden' type="file" id='image' />
                        </div>
                        <div className='flex'>
                            <button className='bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
ثبت
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct