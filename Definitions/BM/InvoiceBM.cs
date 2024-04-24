using System.ComponentModel.DataAnnotations;
using Invoeasy.Definitions.Enum;
using Invoeasy.Definitions.Models;

namespace Invoeasy.Definitions.BM
{
    public class InvoiceBM
    {
        [Required]
        public int Number { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        public Decimal TotalPrice { get; set; }

        public bool SendEmail { get; set; }

        public Status Status { get; set; }
        public DateTime Created { get; set; }
        public TimeSpan Time { get; set; }

        [DropdownBox]
        public Guid CustomerId { get; set; }

        [LookupBox]
        public Guid SupplierId { get; set; }

        [SelectBox]
        public Guid ManufacturerId { get; set; }

        [TagBox]
        public IEnumerable<Guid> SelectedItems { get; set; }

        public InvoiceCustomerBM InvoiceCustomer { get; set; }
        public IEnumerable<ItemBM> Items { get; set; }
    }

    internal class TagBoxAttribute : Attribute
    {
    }

    internal class SelectBoxAttribute : Attribute
    {
    }

    internal class LookupBoxAttribute : Attribute
    {
    }

    internal class DropdownBoxAttribute : Attribute
    {
    }
}
