import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Category() {
    const product = useSelector(state => state.products.data)
    const category = product?.map(e => (e.category)).flat().filter((value, index, self) => self.indexOf(value) === index) || []
    return (
        <div className={' mt-20  '}>
            <h1 className={'text-2xl font-bold text-start mb-4'}>DANH MỤC</h1>
            <div className={'grid grid-rows-2 grid-flow-col gap-1 carousel p-1 max-lg:overflow-x-scroll'}>
                {
                    category.map((e, i) => (
                        <Link to={`/category/${e}`} key={i} className={'w-28 h-28 hover:outline hover:outline-1 hover:outline-black hover:scale-105  flex justify-center items-center flex-col '}>
                            <div className={'h-12 w-12 rounded-full mb-4'}>
                                <img
                                    src="https://th.bing.com/th/id/OIP.O9tp7tHdxxMLdSpLNDkQcQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                    alt="" className={''} />
                            </div>
                            <h1 className={'line-clamp-1'}>{e}</h1>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Category;