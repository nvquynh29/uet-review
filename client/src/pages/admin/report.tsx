import React, { useState, useEffect } from 'react'
import Pagination from "../../components/global/Pagination";
import avatar from "../../images/avatar.png";
import { Link, useLocation } from 'react-router-dom'
import { getListReport } from '../../api/report';
import { truncateString } from '../../utils/string';

type ReportResp = {
    _id: string
    reporter: {
        _id: string
        nickname: string
        email: string
    }
    post: {
        _id: string
        title: string
        slug: string
    }
    reason: string
    status_id: number
}

type CustomPagination = {
    page: number
    size: number
    total: number
    total_page: number
}

const Report = () => {
    const [reports, setReports] = useState<ReportResp[]>()
    const [pagination, setPagination] = useState<CustomPagination>({ page: 1, size: 10, total: 0, total_page: 0 })
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const page = query.get('page')

    useEffect(() => {
       fetchReports(page)
    }, [page])

    const fetchReports = async (page: number | string | null, size: number = 10) => {
       const { data, meta } = await getListReport(page, size)
       setReports(data as ReportResp[])
       setPagination(meta as CustomPagination)
    }
    
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
                    {reports?.map((report, index) => (
                        <tr key={report._id}>
                            <th>{(pagination.page - 1) * pagination.size + index + 1}</th>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={avatar}
                                        alt=""
                                        style={{ width: 45, height: 45 }}
                                        className="rounded-circle"
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{report.reporter.nickname}</p>
                                        <p className="text-muted mb-0">{report.reporter.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1"><Link
                                    to={`/review/${report.post.slug}`}
                                    style={{ fontSize: "1rem", fontWeight: "500" }}
                                >
                                    {truncateString(report.post.title, 50)}
                                </Link></p>
                            </td>
                            <td>{truncateString(report.reason, 50)}</td>
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
                    ))}
                </tbody>
            </table>

            <Pagination total={pagination.total_page} />
        </>
    )
}

export default Report