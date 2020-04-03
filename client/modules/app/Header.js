import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HamburgerNav from './HamburgerNav';

export default (props) => {
    const { address, logoSrc, catalogName, contact: { telephone } } = props;
    return (
        <Fragment >
            <HamburgerNav pages={props.pages} catalogName={catalogName} />
            <div className="d-flex position-absolute w-100 px-3 px-md-5 py-4 z-99">
                <div className="mr-auto">
                    <Link to='/'><img src={logoSrc} className="logo"></img></Link>
                </div>
                <div>
                    <h4 className="text-white text-center font-weight-bold">{catalogName}</h4>
                    <div className="d-block d-sm-none">
                        {address ?
                            (
                                <div className="d-flex">
                                    <i className="lnr lnr-map-marker mr-2 text-white mt-1" />
                                    <a href={address.mapsUrl} target="_blank" className="text-white">
                                        <div>{address.addressTitle}</div>
                                        <div>{address.lineOne} {address.lineTwo}</div>
                                        <div>{address.city}&#44; {address.state} {address.zip}</div>
                                    </a>
                                </div>
                            ) : ""
                        }
                        {telephone ?
                            (
                                <div className="d-flex">
                                    <i className="lnr lnr-phone-handset mr-2 text-white mt-1" />
                                    <a href={`tel:${telephone.value}`} className="text-white" dangerouslySetInnerHTML={{ __html: telephone.label }} />
                                </div>
                            )
                            : ("")
                        }
                    </div>
                    <ul className="nav justify-content-center d-none d-md-flex">
                        {
                            props.pages.map(page =>
                                <li className="nav-item" key={page.id}>
                                    <NavLink
                                        exact={!page.slug}
                                        to={`/${page.slug || ''}`}
                                        className="nav-link text-white mx-3"
                                        activeClassName="bordered-bottom"
                                        title={page.name}>
                                        {page.name}
                                    </NavLink>
                                </li>
                            )}
                    </ul>
                </div>
                <div className="d-none d-sm-block mx-auto mx-md-0 ml-md-auto">
                    <div className="text-center text-md-left">
                        {address ?
                            (
                                <div className="d-flex">
                                    <i className="lnr lnr-map-marker mr-2 text-white mt-1" />
                                    <a href={address.mapsUrl} target="_blank" className="text-white">
                                        <div>{address.addressTitle}</div>
                                        <div>{address.lineOne} {address.lineTwo}</div>
                                        <div>{address.city}&#44; {address.state} {address.zip}</div>
                                    </a>
                                </div>
                            ) : ("")
                        }
                        {telephone ?
                            (
                                <div className="d-flex">
                                    <i className="lnr lnr-phone-handset mr-2 text-white mt-1" />
                                    <a href={`tel:${telephone.value}`} className="text-white" dangerouslySetInnerHTML={{ __html: telephone.label }} />
                                </div>
                            )
                            : ("")
                        }
                    </div>
                </div>
                <div className="d-md-none box-60 ml-auto"></div>
            </div >
        </Fragment >
    );
}