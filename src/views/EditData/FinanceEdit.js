import React, { useEffect, useState } from 'react';
import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import InvoiceData from '../../components/FinanceTable/InvoiceData';
import InvoiceModal from '../../components/FinanceTable/InvoiceModal';
import ReceiptModal from '../../components/FinanceTable/ReceiptModal';
import CreateReceipt from '../../components/FinanceTable/CreateReceipt';
import CreateNote from '../../components/FinanceTable/CreateNote';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import CustomerDetail from '../../components/FinanceTable/CustomerDetail';
import FinanceInvoiceModal from '../../components/FinanceTable/FinanceInvoiceModal';
import CustomerFinanceReceipt from '../../components/FinanceTable/CustomerFinanceReceipt';
import CustomerFinanceCreditNote from '../../components/FinanceTable/CustomerFinanceCreditNote';
import FinanceSummary from '../../components/FinanceTable/FinanceSummary';
//import FinanceButton from '../../components/FinanceTable/FinanceButton';
import FinanceDeliveryAddress from '../../components/FinanceTable/FinanceDeliveryAddress';
import FinanceMainDetails from '../../components/FinanceTable/FinanceMainDetails';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const FinanceEdit = () => {
  // All state variables
  const [editInvoiceData, setEditInvoiceData] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [editCreateReceipt, setEditCreateReceipt] = useState(false);
  const [editCreateNote, setEditCreateNote] = useState(false);
  const [editInvoiceModal, setEditInvoiceModal] = useState(false);
  const [editReceiptModal, setEditReceiptModal] = useState(false);
  const [editReceiptDataModal, setReceiptDataModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [financeDetails, setFinanceDetails] = useState();
  const [createInvoice, setCreateInvoice] = useState(null);
  const [cancelInvoice, setCancelInvoice] = useState(null);
  const [cancelReceipt, setCancelReceipt] = useState(null);
  // const [cancelReceipt, setCancelReceipt] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [note, setNote] = useState([]);
  const [invoicesummary, setInvoiceSummary] = useState(null);
  const [receiptsummary, setReceiptSummary] = useState(null);
  const [invoiceitemsummary, setInvoiceItemSummary] = useState(null);
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  //Button fuctions
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Finance');
  };
  //All Functions/Methods
  //Setting Data in Finance Details
  const handleInputs = (e) => {
    setFinanceDetails({ ...financeDetails, [e.target.name]: e.target.value });
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // Method for getting Invoice By Order Id
  const getInvoiceById = () => {
    api
      .post('/invoice/getInvoiceById', { order_id: id })
      .then((res) => {
        setCreateInvoice(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };

  //receipt Cancel
  const receiptCancel = (obj) => {
    obj.receipt_status = 'cancelled';
    api
      .post('/finance/editTabReceiptPortalDisplay', obj)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const invoiceCancel = (obj) => {
    obj.status = 'cancelled';
    api
      .post('/finance/editInvoicePortalDisplay', obj)
      .then(() => {
        message('Record editted successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //get Invoice Cancel
  const getInvoiceCancel = () => {
    api
      .post('/invoice/getInvoiceCancel', { order_id: id })
      .then((res) => {
        setCancelInvoice(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  //get receipt
  const getReceiptCancel = () => {
    api
      .post('/invoice/getReceiptCancel', { order_id: id })
      .then((res) => {
        setCancelReceipt(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };
  //For getting Receipy By Order Id
  const getReceiptById = () => {
    api
      .post('/invoice/getReceiptById', { order_id: id })
      .then((res) => {
        setReceipt(res.data.data);
      })
      .catch(() => {
        message('Cannot get Receipt Data', 'error');
      });
  };

  //For getting Credit By Order Id
  const getCreditById = () => {
    api
      .post('/invoice/getNoteById', { order_id: id })
      .then((res) => {
        setNote(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };

  //For getting Summary By Order Id
  const getInvoiceSummaryById = () => {
    api
      .post('/finance/getInvoiceSummary', { order_id: id })
      .then((res) => {
        setInvoiceSummary(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };

  const getInvoiceReceiptSummaryById = () => {
    api
      .post('/finance/getInvoiceReceiptSummary', { order_id: id })
      .then((res) => {
        setReceiptSummary(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };

  const getInvoiceItemSummaryById = () => {
    api
      .post('/finance/getInvoiceItemSummary', { order_id: id })
      .then((res) => {
        setInvoiceItemSummary(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };

  //For getting Finance By Order Id
  const getFinancesById = () => {
    api
      .post('/finance/getFinancesById', { order_id: id })
      .then((res) => {
        setFinanceDetails(res.data.data);
      })
      .catch(() => {
        message('Fianance Data Not Found', 'info');
      });
  };

  //For editting Finace Record
  const editFinanceData = () => {
    financeDetails.modification_date = creationdatetime;
    api
      .post('/finance/editFinances', financeDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getInvoiceById();
    getFinancesById();
    getReceiptById();
    getCreditById();
    getInvoiceCancel();
    getReceiptCancel();
    getInvoiceSummaryById();
    getInvoiceReceiptSummaryById();
    getInvoiceItemSummaryById();
  }, [id]);
  return (
    <>
      <BreadCrumbs heading={financeDetails && financeDetails.order_id} />
      <TabContent className="p-4" activeTab={activeTab}>
        {/* Save,Apply Buttons */}
        {/* <FinanceButton
          navigate={navigate}
          editFinanceData={editFinanceData}
          applyChanges={applyChanges}
          backToList={backToList}
        ></FinanceButton> */}
<ApiButton
              editData={editFinanceData}
              navigate={navigate}
              applyChanges={applyChanges}
              backToList={backToList}
             // deleteData={deleteLoanData}
              module="Finance"
            ></ApiButton>
        {/* Main Details */}
        <FinanceMainDetails
          financeDetails={financeDetails}
          creationModificationDate={financeDetails}
          handleInputs={handleInputs}
        ></FinanceMainDetails>

        <Row>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
                Delivery Address
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggle('2');
                }}
              >
                Customer Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '3' ? 'active' : ''}
                onClick={() => {
                  toggle('3');
                }}
              >
                Summary
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeTab === '4' ? 'active' : ''}
                onClick={() => {
                  toggle('4');
                }}
              >
                Invoice(s)
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeTab === '5' ? 'active' : ''}
                onClick={() => {
                  toggle('5');
                }}
              >
                Receipt(s)
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeTab === '6' ? 'active' : ''}
                onClick={() => {
                  toggle('6');
                }}
              >
                CreditNote(s)
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        {/* Delivery address Form */}
        <TabPane tabId="1">
          <ComponentCard title="Delivery Address">
            <FinanceDeliveryAddress
              financeDetails={financeDetails}
              handleInputs={handleInputs}
            ></FinanceDeliveryAddress>
          </ComponentCard>
        </TabPane>

        {/* Customer Details Form */}
        <TabPane tabId="2">
          <ComponentCard title="Finance Details">
            <CustomerDetail financeDetails={financeDetails}></CustomerDetail>
          </ComponentCard>
        </TabPane>
        {/* Summary */}
        <TabPane tabId="3">
          <ComponentCard title="Summary">
            <FinanceSummary
              invoicesummary={invoicesummary}
              receiptsummary={receiptsummary}
              invoiceitemsummary={invoiceitemsummary}
            ></FinanceSummary>
          </ComponentCard>
        </TabPane>
        <TabPane tabId="4">
          <ComponentCard title="Invoice">
            <FinanceInvoiceModal
              createInvoice={createInvoice}
              cancelInvoice={cancelInvoice}
              invoiceCancel={invoiceCancel}
              setEditModal={setEditModal}
              setEditInvoiceModal={setEditInvoiceModal}
            ></FinanceInvoiceModal>
          </ComponentCard>
        </TabPane>

        <TabPane tabId="5">
          <ComponentCard title="Receipt">
            <CustomerFinanceReceipt
              receiptCancel={receiptCancel}
              cancelReceipt={cancelReceipt}
              receipt={receipt}
              setEditReceiptModal={setEditReceiptModal}
              setReceiptDataModal={setReceiptDataModal}
            ></CustomerFinanceReceipt>
          </ComponentCard>
        </TabPane>

        <TabPane tabId="6">
          <ComponentCard title="Credit Note">
            <CustomerFinanceCreditNote note={note}></CustomerFinanceCreditNote>
          </ComponentCard>
        </TabPane>
        <ComponentCard title="More Details">
          <ToastContainer></ToastContainer>

          {/* Modal for invoice,receipt and credit note */}

          <InvoiceData
            editInvoiceData={editInvoiceData}
            setEditInvoiceData={setEditInvoiceData}
            projectInfo={InvoiceData}
          />

          <CreateReceipt
            editCreateReceipt={editCreateReceipt}
            setEditCreateReceipt={setEditCreateReceipt}
          />

          <CreateNote editCreateNote={editCreateNote} setEditCreateNote={setEditCreateNote} />

          <InvoiceModal
            editModal={editModal}
            setEditModal={setEditModal}
            editInvoiceModal={editInvoiceModal}
          />
          <ReceiptModal
            editReceiptModal={editReceiptModal}
            setReceiptDataModal={setReceiptDataModal}
            editReceiptDataModal={editReceiptDataModal}
          />

          {/* Invoice,Receipt and Note tab button */}
          <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setEditInvoiceData(true);
                }}
              >
                Create Invoice
              </Button>
            </Col>
            <Col>
              <Button
                className="buttons"
                color="primary"
                onClick={() => {
                  setEditCreateReceipt(true);
                }}
              >
                Create Receipt
              </Button>
            </Col>
            <Col>
              <Button
                className="buttons"
                color="primary"
                onClick={() => {
                  setEditCreateNote(true);
                }}
              >
                Credit Notes
              </Button>
            </Col>
          </Row>
        </ComponentCard>
      </TabContent>
    </>
  );
};
export default FinanceEdit;
