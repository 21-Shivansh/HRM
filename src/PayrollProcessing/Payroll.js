import React from 'react';
import CustomTable from '../Components/CustomTable';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Payroll() {
  const payrolls = [
    { name: 'Aagam Sheth', salary: 29254 },
    { name: 'Avadai Marthuvar', salary: 29254 },
    { name: 'Hrutika Mohal', salary: 22570 },
    { name: 'Jahnvi Thakker', salary: 50000 },
    { name: 'Joyeeta Khaskel', salary: 68550 },
    { name: 'Komal Bhanushali', salary: 68550 },
    { name: 'Preshita Rane', salary: 51950 },
    { name: 'Priyanka Panjwani', salary: 51950 },
    { name: 'Rajalaxmi Das', salary: 58786 },
    { name: 'Rashesh Doshi', salary: 150000 },
    { name: 'Rushali Rajgor', salary: 17000 },
    { name: 'Snehal kadu', salary: 51950 },
    { name: 'Surbhi Jain', salary: 68550 },
    { name: 'Vaishnavi Bhagat', salary: 43160 },
    { name: 'Vedika Tolani', salary: 34254 },
    { name: 'Jagruti Doshi', salary: 40000 },
    { name: 'Kajal Khamkar', salary: 18595 },
    { name: 'Nishi Doshi', salary: 22500 },
    { name: 'Deepti Singh', salary: 21870 },
    { name: 'Bankim Doshi', salary: 150000 },
    { name: 'Nita Doshi', salary: 40000 },
    { name: 'Pragya Doshi', salary: 50000 },
    { name: 'Chaitali Doshi', salary: 50000 },
    { name: 'Preeti Doshi', salary: 50000 },
    { name: 'Kinjal Patel', salary: 40000 },
    { name: 'Minal Sanghvi', salary: 100000 },
    { name: 'Jigna Sanghvi', salary: 100000 },
    { name: 'SAUMYA KIRIT GALA', salary: 100000 },
    { name: 'Shreya Santosh Talashilkar', salary: 29454 },
  ];

  const columns = [
    { header: 'Sr. No', accessor: 'id' },
    { header: 'Employee Name', accessor: 'name' },
    { header: 'Days in month', accessor: 'daysInMonth' },
    { header: 'Paid Days', accessor: 'paidDays' },
    { header: 'Fixed GROSS Salary (NEW)', accessor: 'fixedGrossSalary' },
    { header: 'Basic + DA', accessor: 'basicDA' },
    { header: 'HRA', accessor: 'hra' },
    { header: 'Conveyance', accessor: 'conveyance' },
    { header: 'Medical Allow', accessor: 'medicalAllow' },
    { header: 'Other ALLOWANCE', accessor: 'otherAllowance' },
    { header: 'Gross', accessor: 'gross' },
    { header: 'Earn basic', accessor: 'earnBasic' },
    { header: 'Earn HRA', accessor: 'earnHRA' },
    { header: 'Conveyance', accessor: 'earnConveyance' },
    { header: 'Medical Allow', accessor: 'earnMedicalAllow' },
    { header: 'Incentive', accessor: 'incentive' },
    { header: 'Earn OTHER Allo', accessor: 'earnOtherAllo' },
    { header: 'Earn Gross', accessor: 'earnGross' },
    { header: 'PF WAGES', accessor: 'pfWages' },
    { header: 'PF', accessor: 'pf' },
    { header: 'ESIC', accessor: 'esic' },
    { header: 'PT', accessor: 'pt' },
    { header: 'LWF', accessor: 'lwf' },
    { header: 'Advance', accessor: 'advance' },
    { header: 'Total Deduction', accessor: 'totalDeduction' },
    { header: 'Net Payable', accessor: 'netPayable' },
    { header: 'Graduity', accessor: 'graduity' },
    { header: 'EMPYER PF', accessor: 'employerPF' },
    { header: 'EMPYER ESIC', accessor: 'employerESIC' },
    { header: 'Bonus', accessor: 'bonus' },
    { header: 'EMPLOYER LWF', accessor: 'employerLWF' },
    { header: 'CTC', accessor: 'ctc' },
    { header: 'Remark', accessor: 'remark' },
    { header: 'Remark2', accessor: 'remark2' },
  ];

  const generatePayrollData = (payrolls) => {
    return payrolls.map((payroll, index) => {
      const daysInMonth = 31;
      const paidDays = 31;
      const fixedGrossSalary = payroll.salary;
      const basicDA = Math.round(payroll.salary * 0.5);
      const hra = Math.round(basicDA * 0.5);
      const conveyance = 1200;
      const medicalAllow = 1000;
      const otherAllowance = payroll.salary - hra - basicDA - conveyance - medicalAllow;
      const gross = basicDA + hra + conveyance + medicalAllow + otherAllowance;
      const earnBasic = Math.round((basicDA / daysInMonth) * paidDays);
      const earnHRA = Math.round((hra / daysInMonth) * paidDays);
      const earnConveyance = Math.round((conveyance / daysInMonth) * paidDays);
      const earnMedicalAllow = Math.round((medicalAllow / daysInMonth) * paidDays);
      const incentive = 0;
      const earnOtherAllo = Math.round((otherAllowance / daysInMonth) * paidDays);
      const earnGross = earnBasic + earnHRA + earnConveyance + earnMedicalAllow + earnOtherAllo;
      const pfWages = earnGross - earnHRA;
      const pf = Math.round(pfWages >= 15000 ? 1800 : pfWages * 0.12);
      const esic = Math.ceil(gross >= 21001 ? 0 : earnGross * 0.0075);
      const pt = 200;
      const lwf = 25;
      const advance = 0;
      const totalDeduction = pf + esic + pt + lwf + advance;
      const netPayable = earnGross - totalDeduction;
      const graduity = Math.round(earnBasic * 0.0481) + 1;
      const employerPF = Math.round(pf);
      const employerESIC = Math.ceil(gross >= 21001 ? 0 : earnGross * 0.0325);
      const bonus = Math.round(basicDA * 0.0833);
      const employerLWF = lwf * 3;
      const ctc = earnGross + employerPF + employerESIC + graduity + employerLWF;

      return {
        id: index + 1,
        name: payroll.name,
        daysInMonth,
        paidDays,
        fixedGrossSalary: `${fixedGrossSalary}`,
        basicDA: `${basicDA}`,
        hra: `${hra}`,
        conveyance: `${conveyance}`,
        medicalAllow: `${medicalAllow}`,
        otherAllowance: `${otherAllowance.toFixed(2)}`,
        gross: `${gross.toFixed(2)}`,
        earnBasic: `${earnBasic}`,
        earnHRA: `${earnHRA}`,
        earnConveyance: `${earnConveyance}`,
        earnMedicalAllow: `${earnMedicalAllow}`,
        incentive: `${incentive}`,
        earnOtherAllo: `${earnOtherAllo}`,
        earnGross: `${earnGross}`,
        pfWages: `${pfWages}`,
        pf: `${pf}`,
        esic: `${esic}`,
        pt: `${pt}`,
        lwf: `${lwf}`,
        advance: `${advance}`,
        totalDeduction: `${totalDeduction}`,
        netPayable: `${netPayable}`,
        graduity: `${graduity}`,
        employerPF: `${employerPF}`,
        employerESIC: `${employerESIC}`,
        bonus: `${bonus}`,
        employerLWF: `${employerLWF}`,
        ctc: `${ctc}`,
        remark: '-',
        remark2: '-',
      };
    });
  };

  const payrollData = generatePayrollData(payrolls);

  return (
    <Root>
      <PaperStyled>
        <Typography variant="h4" gutterBottom>
          Payroll Details
        </Typography>
        <CustomTable columns={columns} data={payrollData} />
      </PaperStyled>
    </Root>
  );
}

export default Payroll;