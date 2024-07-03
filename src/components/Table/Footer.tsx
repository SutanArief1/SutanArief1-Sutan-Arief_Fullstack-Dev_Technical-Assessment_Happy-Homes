import { TableCell, TableRow } from '@mui/material'

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const Footer = () => {
  return (
    <>
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={2}>Subtotal</TableCell>
          <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tax</TableCell>
          <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
          <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
        </TableRow>
    </>
  )
}

export default Footer