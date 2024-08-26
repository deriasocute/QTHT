using ClosedXML.Excel;
using DocumentFormat.OpenXml.Drawing;
using System.Collections;
using System.Text.RegularExpressions;

namespace QTHT.Export
{
    public class ExportExcel
    {
        public static bool Export(out XLWorkbook MyWorkBook, List<Hashtable> items, Dictionary<string, string> headers, string template, int rowstart, int colstart, string title = "")
        {
            MyWorkBook = System.IO.File.Exists(template) ? new XLWorkbook(template) : new XLWorkbook();
            try
            {
                int index = 0;
                int sheet = 1;
                var myWorkSheet = MyWorkBook.Worksheet(sheet);
                //Header
                if (MyWorkBook.Worksheet(sheet) == null)
                    MyWorkBook.AddWorksheet(sheet.ToString());
                if (!string.IsNullOrEmpty(title))
                {
                    myWorkSheet.Range(myWorkSheet.Cell(rowstart, colstart), myWorkSheet.Cell(rowstart, colstart + headers.Count - 1)).Merge();
                    myWorkSheet.Cell(rowstart, colstart).Style.Font.Bold = true;
                    myWorkSheet.Cell(rowstart, colstart).Style.Font.FontSize = 13;
                    myWorkSheet.Cell(rowstart, colstart).Value = title;
                    myWorkSheet.Cell(rowstart, colstart).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                }
                rowstart += 3;
                foreach (var item in headers)
                {
                    myWorkSheet.Cell(rowstart, colstart + index).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    myWorkSheet.Cell(rowstart, colstart + index).Style.Font.Bold = true;
                    myWorkSheet.Cell(rowstart, colstart + index).Value = item.Value;
                    myWorkSheet.Cell(rowstart, colstart + index).Style.Alignment.WrapText = true;
                    myWorkSheet.Cell(rowstart, colstart + index).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                    myWorkSheet.Cell(rowstart, colstart + index).Style.Border.TopBorder = XLBorderStyleValues.Thin;
                    myWorkSheet.Cell(rowstart, colstart + index).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                    myWorkSheet.Cell(rowstart, colstart + index).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                    index++;
                }
                int skip = 0;
                int take = 5000;
                var itemSheets = items.Skip(skip).Take(take - rowstart).ToList();
                //Add record 
                while (itemSheets.Count > 0)
                {
                    if (MyWorkBook.Worksheet(sheet) == null)
                        MyWorkBook.AddWorksheet(sheet.ToString());
                    myWorkSheet = MyWorkBook.Worksheet(sheet);
                    myWorkSheet.Columns().AdjustToContents();
                    index = 1;
                    foreach (var item in itemSheets)
                    {
                        var values = item;
                        int col = 0;
                        foreach (var it in headers)
                        {
                            var value = GetString(values, it.Key);
                            myWorkSheet.Cell(rowstart + index, colstart + col).DataType = XLDataType.Text;
                            myWorkSheet.Cell(rowstart + index, colstart + col).Value = Convert.ToString(value);
                            myWorkSheet.Cell(rowstart + index, colstart + col).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                            myWorkSheet.Cell(rowstart + index, colstart + col).Style.Border.TopBorder = XLBorderStyleValues.Thin;
                            myWorkSheet.Cell(rowstart + index, colstart + col).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                            myWorkSheet.Cell(rowstart + index, colstart + col).Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                            col++;
                        }
                        index++;
                    }
                    itemSheets = items.Skip((take * sheet) - 1 - rowstart).Take(take).ToList();
                    sheet++;
                }
                myWorkSheet.Columns().AdjustToContents(rowstart, 5.0, 90.0);
                myWorkSheet.Columns().Style.Alignment.SetWrapText(true);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public static string GetString(Hashtable args, object i, bool removeSpace = false)
        {
            try
            {
                string text = args[i].ToString();
                if (removeSpace)
                {
                    text = text.Replace(" ", "").Trim();
                }

                text = text.Trim('\t', '\n').Trim();
                Regex regex = new Regex("<script[^>]*>[\\s\\S]*?</script>", RegexOptions.IgnoreCase);
                return regex.Replace(text, "");
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}
