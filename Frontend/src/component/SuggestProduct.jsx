import React from 'react';
import Card from "./Card.jsx";
import {useSelector} from "react-redux";

function SuggestProduct() {
    const productsSuggest = useSelector(state => state.products.data)
    return (
        <div className={'mt-10'}>
            <div className={'font-medium text-xl text-start'}>Gợi ý cho bạn</div>
            <div className={'carousel carousel-center w-full'}>
                {productsSuggest.map((e, i) => (
                    <div key={i} className={'carousel-item m-2'}>
                        <Card product={e} className={''}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuggestProduct;