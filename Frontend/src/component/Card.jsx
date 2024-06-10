import { Link } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber.js";

function Card({ product }) {
    const discountedPrice = product.price * (100 - parseFloat(product.sale)) / 100

    return (
        <Link to={`/products/${product._id}`}>
            <div
                className=" w-[260px] h-[360px] hover:scale-[102%]  bg-white  grid grid-rows-[55%,45%]">
                <figure
                    style={{
                        backgroundImage: `url(${product?.image?.url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                </figure>

                <div className="p-2 relative">
                    <p className={'text-gray-500'}>{product.brand}</p>
                    <h2 className=" text-2xl font-medium !line-clamp-1  ">{product.name}</h2>
                    <p className={'text-gray-600 line-clamp-1 italic'}>{product.desc}</p>
                    <div className={'mt-2'}>

                        {
                            product.sale ?
                                <div>
                                    <div className={' text-start'}>
                                        <p className={'text-gray-500  font-normal'}>
                                            <span
                                                className={'line-through'}> {formatNumber(product.price)}<span>đ</span></span>
                                            <span className={'text-red-600 ml-2'}>-{product.sale}</span>
                                        </p>
                                        <p className={'text-black text-xl font-medium'}>
                                            {formatNumber(discountedPrice)}
                                            <span className={' text-lg'}>đ</span>
                                        </p>
                                    </div>
                                </div> :
                                <p className={'text-black text-xl font-medium'}>
                                    {formatNumber(product.price)}
                                    <span className={'text-lg'}>đ</span>
                                </p>

                        }
                    </div>
                    <div className={'text-end text-[10px] absolute bottom-0 right-0 mx-1'}>Click để xem chi tiết</div>
                </div>

            </div>
        </Link>
    )
        ;
}

export default Card;