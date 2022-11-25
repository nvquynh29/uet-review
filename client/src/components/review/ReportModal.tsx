import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { ReportType } from "../../utils/enum";
import { FormSubmit } from "../../utils/TypeScript";

interface IProps {
  isShow: boolean;
  reportType: ReportType; //* enum: 0-post, 1-comment
  invokeModal: () => void;
  setReported: Dispatch<SetStateAction<boolean>>;
}

function ReportModal(prop: IProps) {
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    prop.invokeModal();
    // TODO send API request here
    prop.setReported(true);
  };

  const handleCloseButton = () => {
    prop.invokeModal();
  };

  return (
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
            >
              <option>Nội dung sai sự thật</option>
              <option>Nội dung bị lỗi thời</option>
              <option>Nội dung spam</option>
              <option>Nội dung có ngôn ngữ thô tục</option>
              <option>Khác</option>
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
  );
}

export default ReportModal;