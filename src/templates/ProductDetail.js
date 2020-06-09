import React, {useCallback, useMemo, useState} from 'react';
import ImageSwiper from "../components/Products/ImageSwiper";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../firebase";
import {SizeTable} from "../components/Products";
import {SecondaryButton} from "../components/UIkit";
import {push} from "connected-react-router";

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        },
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        },
    },
    price: {
        fontSize: 36
    }
}))

const ProductDetail = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const path = selector.router.location.pathname
    const id = path.split('/product/')[1]

    const [product, setProduct] = useState(null);

    const productRef = useMemo(() => {
        const ref = db.collection('products').doc(id)

        ref.get().then(doc => {
            const data = doc.data()
            setProduct(data)
        })

        return ref
    },[])

    const backToTop = useCallback(() => {
        dispatch(push('/'))
    }, [])

    return (
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.productName}</h2>
                        <p className={classes.price}>¥{(product.price).toLocaleString()}</p>
                        <div className="module-spacer--small"/>
                        <SizeTable sizes={product.sizes}/>
                        <div className="module-spacer--small"/>
                        <p>{product.description}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetail;