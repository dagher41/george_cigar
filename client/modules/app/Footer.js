import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const { address, contact: { telephone, email } } = props;
    const socialLinks = props.social && Object.values(props.social).filter(item => item.footerVisible).sort((a, b) => a.position - b.position)
    return (
        <div className="row no-gutters bg-gray text-white p-5">
            <div className="col-sm-12 col-md-4">
                <h5 className="border-bottom mr-5">Contact</h5>
                <div className="d-flex">
                    <i className="lnr lnr-store mr-2 text-white mt-1" /><span>{props.catalogName}</span>
                </div>
                {address ?
                    <div className="d-flex">
                        <i className="lnr lnr-map-marker mr-2 text-white mt-1" />
                        <a href={address.mapsUrl} target="_blank" className="text-white">
                            <div>{address.addressTitle}</div>
                            <div>{address.lineOne} {address.lineTwo}</div>
                            <div>{address.city}&#44; {address.state} {address.zip}</div>
                        </a>
                    </div>
                    : ""
                }
                {telephone ?
                    <div className="d-flex">
                        <i className="lnr lnr-phone-handset mr-2 text-white mt-1" />
                        <a href={`tel:${telephone.value}`} className="text-white" dangerouslySetInnerHTML={{ __html: telephone.label }} />
                    </div>
                    : ""
                }
                {email ?
                    <div className="d-flex">
                        <i className="lnr lnr-envelope mr-2 text-white mt-1" />
                        <a href={`mailto:${email.value}`} className="text-white">{email.label}</a>
                    </div>
                    : ""
                }
            </div>
            <div className="col-sm-12 col-md-4 my-md-0 my-4">
                <h5 className="border-bottom mr-5">Site</h5>
                {props.pages.map(page =>
                    <div key={page.id}>
                        <Link to={`/${page.slug || ''}`}
                            className="py-2 text-white"
                            title={page.name}>
                            {page.name}
                        </Link>
                    </div>
                )}
            </div>
            {
                socialLinks ?
                    <div className="col-sm-12 col-md-4">
                        <h5 className="border-bottom mr-5">Social</h5>
                        <div>
                            {socialLinks.map(link =>
                                <a key={link.title} className="mr-3" href={link.href} title={link.title} target="_blank">
                                    <img loading="lazy" src={link.imageSource} alt={link.title} height="50px" />
                                </a>
                            )}
                        </div>
                    </div>
                    : ""
            }
        </div >
    );
}