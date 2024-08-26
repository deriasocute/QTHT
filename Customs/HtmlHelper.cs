using DocumentFormat.OpenXml.Drawing;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.Web.Mvc;

namespace QTHT.Customs
{
    public class CustomSelectItem : System.Web.Mvc.SelectListItem
    {
        public string Class { get; set; }
        public string SelectedValue { get; set; }
    }
    
    public static class HelperHtml
    {
        public static MvcHtmlString CusTextBox(this HtmlHelper html, string id, string name, object value, string displayname, string placeholder = "", bool isNotEmpty = false, object htmlAttributes = null, int maxlen = 0, int minlen = 0, bool isReadOnly = false)
        {
            System.Web.Mvc.TagBuilder tag = new System.Web.Mvc.TagBuilder("input");
            if (maxlen > 0 || minlen > 0)
            {
                var text = $" không được ngoài khoảng từ {minlen} đến {maxlen} ký tự";

                if (maxlen > 0 && minlen <= 0)
                {
                    text = $" không được vượt quá {maxlen} ký tự";
                }
                else if (maxlen <= 0 && minlen > 0)
                {
                    text = $" không được ít hơn {minlen} ký tự";
                }
                tag.MergeAttribute("data-bv-stringLength-message", displayname + text);
                tag.MergeAttribute("data-bv-stringlength-max", maxlen.ToString());
                tag.MergeAttribute("minlength", minlen.ToString());
            }
            tag.setCommonTextBox(id, name, value, displayname, placeholder, isNotEmpty, htmlAttributes, isReadOnly: isReadOnly);
            return new MvcHtmlString(tag.ToString());
        }
        public static IDictionary<string, object> AnonymousObjectToHtmlAttributes(object htmlAttributes)
        {
            var dictionary = new Dictionary<string, object>();
            if (htmlAttributes != null)
            {
                foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(htmlAttributes))
                {
                    dictionary.Add(property.Name.Replace('_', '-'), property.GetValue(htmlAttributes));
                }
            }
            return dictionary;
        }
        private static void setCommonTextBox(this System.Web.Mvc.TagBuilder tag, string id, string name, object value, string displayname, string placeholder = "", bool isNotEmpty = false, object htmlAttributes = null, bool isReadOnly = false, string dfClass = "form-control")
        {
            tag.MergeAttribute("type", "text");
            tag.MergeAttribute("id", id);
            tag.MergeAttribute("name", name);
            tag.MergeAttribute("class", dfClass);
            tag.MergeAttribute("placeholder", placeholder);
            tag.MergeAttribute("title", placeholder);
            if (isNotEmpty)
            {
                tag.MergeAttribute("data-bv-field", name);
                tag.MergeAttribute("data-bv-notempty-message", $"{displayname} không được để trống");
                tag.MergeAttribute("data-bv-notempty", "true");
            }
            if (value != null)
                tag.MergeAttribute("value", value.ToString());

            if (isReadOnly)
            {
                tag.MergeAttribute("readonly", "true");
            }

            if (htmlAttributes != null)
            {
                IDictionary<string, object> attributes = AnonymousObjectToHtmlAttributes(htmlAttributes);
                foreach (var item in attributes)
                {
                    if ((item.Key.ToLower() == "disabled" || item.Key.ToLower() == "readonly") && item.Value.ToString().ToLower() == "false")
                        continue;
                    tag.MergeAttribute(item.Key, item.Value.ToString());
                }
            }
        }
    }
}
