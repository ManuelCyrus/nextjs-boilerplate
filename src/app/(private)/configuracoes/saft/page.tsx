"use client";
import { useState } from "react";
import Header from "@/components/HeaderManager";
import Sidebar from "@/components/SidebarManager";
import Footer from "@/components/footer";

import { Download } from "lucide-react";

interface SaftFile {
  id: string;
  filename: string;
  generatedAt: string;
  period: string;
  xml: string; // armazenar o conteúdo XML para re-download
}

export default function SaftAOGenerator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [history, setHistory] = useState<SaftFile[]>([]);

  const company = {
    id: "5002286645",
    name: "Hukold",
    address: "Bairro Rocha Pinto - Rua Direita da Enana - Luanda",
    phone: "941452153",
    email: "geral@manuelnd.com",
    softwareValidation: "489/AGT/2024",
    productId:
      "DYLANDE/DYLANDE - PRESTAÇAO DE SERVIÇOS E COMERCIO GERAL, (SU), LDA",
  };

  const products = [
    { code: "51", description: "Albendazol comprimido", price: 500 },
    { code: "49", description: "Amilodepina 10 mg indiano", price: 700 },
  ];

  const generateSaft = () => {
    if (!startDate || !endDate) return alert("Selecione o período válido!");

    const now = new Date();
    const filename = `SAFT_${startDate}_to_${endDate}.xml`;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<AuditFile xmlns="urn:OECD:StandardAuditFile-Tax:AO_1.01_01">
  <Header>
    <AuditFileVersion>1.01_01</AuditFileVersion>
    <CompanyID>${company.id}</CompanyID>
    <TaxRegistrationNumber>${company.id}</TaxRegistrationNumber>
    <TaxAccountingBasis>F</TaxAccountingBasis>
    <CompanyName>${company.name}</CompanyName>
    <BusinessName>${company.name}</BusinessName>
    <CompanyAddress>
      <AddressDetail>${company.address}</AddressDetail>
      <City>Luanda</City>
      <Country>AO</Country>
    </CompanyAddress>
    <FiscalYear>${new Date().getFullYear()}</FiscalYear>
    <StartDate>${startDate}</StartDate>
    <EndDate>${endDate}</EndDate>
    <CurrencyCode>AOA</CurrencyCode>
    <DateCreated>${now.toISOString().split("T")[0]}</DateCreated>
    <TaxEntity>Global</TaxEntity>
    <ProductCompanyTaxID>${company.id}</ProductCompanyTaxID>
    <SoftwareValidationNumber>${company.softwareValidation}</SoftwareValidationNumber>
    <ProductID>${company.productId}</ProductID>
    <ProductVersion>1.0</ProductVersion>
    <Telephone>${company.phone}</Telephone>
    <Email>${company.email}</Email>
    <Website>www.calungasoft.com</Website>
  </Header>

  <MasterFiles>
    <Customer>
      <CustomerID>1</CustomerID>
      <AccountID>9999999999</AccountID>
      <CustomerTaxID>9999999999</CustomerTaxID>
      <CompanyName>Cliente Corrente</CompanyName>
      <BillingAddress>
        <AddressDetail>Angola, Luanda</AddressDetail>
        <City>Luanda</City>
        <Country>AO</Country>
      </BillingAddress>
      <SelfBillingIndicator>0</SelfBillingIndicator>
    </Customer>`;

    products.forEach((p) => {
      xml += `
    <Product>
      <ProductType>P</ProductType>
      <ProductCode>${p.code}</ProductCode>
      <ProductGroup>Produto</ProductGroup>
      <ProductDescription>${p.description}</ProductDescription>
      <ProductNumberCode>${p.code}</ProductNumberCode>
    </Product>`;
    });

    xml += `
  </MasterFiles>

  <SourceDocuments>
    <SalesInvoices>
      <NumberOfEntries>${products.length}</NumberOfEntries>
      <TotalCredit>${products.reduce((a, b) => a + b.price, 0).toFixed(2)}</TotalCredit>
      <Invoice>
        <InvoiceNo>FT 001/2025</InvoiceNo>
        <InvoiceDate>${startDate}</InvoiceDate>
        <CustomerID>1</CustomerID>
        <Line>
          <LineNumber>1</LineNumber>
          <ProductCode>${products[0].code}</ProductCode>
          <ProductDescription>${products[0].description}</ProductDescription>
          <Quantity>1</Quantity>
          <UnitOfMeasure>Unidade</UnitOfMeasure>
          <UnitPrice>${products[0].price.toFixed(2)}</UnitPrice>
          <TaxPointDate>${startDate}</TaxPointDate>
          <CreditAmount>${products[0].price.toFixed(2)}</CreditAmount>
          <Tax>
            <TaxType>IVA</TaxType>
            <TaxCountryRegion>AO</TaxCountryRegion>
            <TaxCode>ISE</TaxCode>
            <TaxPercentage>0</TaxPercentage>
          </Tax>
          <TaxExemptionReason>IVA - Regime Simplificado</TaxExemptionReason>
          <TaxExemptionCode>M00</TaxExemptionCode>
        </Line>
        <DocumentTotals>
          <TaxPayable>0.00</TaxPayable>
          <NetTotal>${products[0].price.toFixed(2)}</NetTotal>
          <GrossTotal>${products[0].price.toFixed(2)}</GrossTotal>
        </DocumentTotals>
      </Invoice>
    </SalesInvoices>
  </SourceDocuments>
</AuditFile>`;

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    // baixar o ficheiro imediatamente
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    // adicionar ao histórico
    setHistory([
      {
        id: Date.now().toString(),
        filename,
        generatedAt: now.toLocaleString(),
        period: `${startDate} → ${endDate}`,
        xml,
      },
      ...history,
    ]);
  };

  const downloadAgain = (file: SaftFile) => {
    const blob = new Blob([file.xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Header />
        <div className="pt-16 max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <Sidebar />
          </aside>

          <main className="lg:col-span-9 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Gerar Ficheiro SAFT-AO (Angola)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    Data Inicial
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    Data Final
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={generateSaft}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Gerar SAFT-AO
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">
                Histórico de Ficheiros SAFT-AO
              </h3>
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-2 border-b text-left">#</th>
                    <th className="p-2 border-b text-left">Arquivo</th>
                    <th className="p-2 border-b text-left">Período</th>
                    <th className="p-2 border-b text-left">Gerado em</th>
                    <th className="p-2 border-b text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={h.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{i + 1}</td>
                      <td className="p-2 border-b">{h.filename}</td>
                      <td className="p-2 border-b">{h.period}</td>
                      <td className="p-2 border-b">{h.generatedAt}</td>
                      <td className="p-2 border-b text-center">
                        <button
                          onClick={() => downloadAgain(h)}
                          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-4 text-center text-gray-400 italic"
                      >
                        Nenhum ficheiro SAFT gerado ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
