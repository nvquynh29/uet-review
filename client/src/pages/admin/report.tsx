import React, { useState } from 'react'
import Pagination from "../../components/global/Pagination";
import avatar from "../../images/avatar.png";
import { Link } from 'react-router-dom'

const Report = () => {
    
    return (
        <>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>STT</th>
                        <th>Người báo cáo</th>
                        <th>Nội dung báo cáo</th>
                        <th>Lý do báo cáo</th>
                        <th>Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src={avatar}
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Trịnh Mai Huy</p>
                                    <p className="text-muted mb-0">huy@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1"><Link
                                to={`/review`}
                                style={{ fontSize: "1rem", fontWeight: "500" }}
                            >
                                Review 1
                            </Link></p>
                        </td>
                        <td>Lý do 1</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-link btn-rounded btn-sm fw-bold"
                                data-mdb-ripple-color="dark"
                            >
                                Xem thêm
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src={avatar}
                                    className="rounded-circle"
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Nguyễn Văn Quỳnh</p>
                                    <p className="text-muted mb-0">quynh@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1"><Link
                                to={`/review`}
                                style={{ fontSize: "1rem", fontWeight: "500" }}
                            >
                                Review 2
                            </Link></p>
                        </td>
                        <td>Lý do 2</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-link btn-rounded btn-sm fw-bold"
                                data-mdb-ripple-color="dark"
                            >
                                Xem thêm
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src={avatar}
                                    className="rounded-circle"
                                    alt=""
                                    style={{ width: 45, height: 45 }}
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">Đỗ Tiến Đạt</p>
                                    <p className="text-muted mb-0">dat@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1"><Link
                                to={`/review`}
                                style={{ fontSize: "1rem", fontWeight: "500" }}
                            >
                                Review 3
                            </Link></p>
                        </td>
                        <td>Lý do 3</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-link btn-rounded btn-sm fw-bold"
                                data-mdb-ripple-color="dark"
                            >
                                Xem thêm
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Pagination total={2} />
        </>
    )
}

export default Report