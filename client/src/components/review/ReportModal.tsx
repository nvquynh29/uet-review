import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { report } from '../../api/report';
import { ReportType } from "../../utils/enum";
import { FormSubmit, InputChange, IReport, SelectChange } from "../../utils/TypeScript";

interface IProps {
  isShow: boolean;
  reportType: ReportType; //* enum: 0-post, 1-comment
  invokeModal: () => void;
  setReported: Dispatch<SetStateAction<boolean>>;
  slug: string;
}

const options = [
  {value: 'Nội dung sai sự thật', text: 'Nội dung sai sự thật'},
  {value: 'Nội dung bị lỗi thời', text: 'Nội dung bị lỗi thời'},
  {value: 'Nội dung spam', text: 'Nội dung spam'},
  {value: 'Nội dung có ngôn ngữ thô tục', text: 'Nội dung có ngôn ngữ thô tục'},
  {value: 'Khác', text: 'Khác'},
]

function ReportModal(prop: IProps) {
  const [reason, setReason] = useState("")
  const [detail, setDetail] = useState("")
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    try {
      await report({
        slug: prop.slug,
        reason,
        detail,
      } as IReport);
      prop.setReported(true);
      setReason('')
      setDetail('')
      toast.success('Báo cáo bài viết thành công');
      prop.invokeModal();
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
        return
      }
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const handleCloseButton = () => {
    prop.invokeModal();
  };

  const handleChangeInput = (e: InputChange) => {
    setDetail(e.target.value)
  }

  const handleChangeSelect = (e: SelectChange) => {
    setReason(e.target.value)
  }

  return (
    <div>
      <Toaster />
      <Modal show={prop.isShow} centered={true}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>
              Báo cáo{" "}
              {prop.reportType === ReportType.Review ? "bài viết" : "bình luận"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="selectContainer">
              <label htmlFor="reportSelector" className="mb-2">
                Lựa chọn lý do báo cáo:
              </label>
              <select
                className="form-control text-capitalize"
                id="reportSelector"
                value={reason}
                onChange={handleChangeSelect}
              >
                {options.map(option => (
                  <option value={option.value}>{option.text}</option>
                ))}
                {/* <option>Nội dung sai sự thật</option>
                <option>Nội dung bị lỗi thời</option>
                <option>Nội dung spam</option>
                <option>Nội dung có ngôn ngữ thô tục</option>
                <option>Khác</option> */}
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="mb-2">
                Chi tiết lý do báo cáo:
              </label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Nhập nội dung..."
                value={detail}
                onChange={handleChangeInput}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCloseButton}
            >
              Huỷ
            </button>
            <button className="btn btn-primary" type="submit">
              Báo cáo
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ReportModal;
