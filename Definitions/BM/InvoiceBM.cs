using System.ComponentModel.DataAnnotations;
using Invoeasy.Definitions.Models;

namespace Invoeasy.Definitions.BM
{
    public class InvoiceBM
    {
        [Required]
        public int Number { get; set; }

        [StringLength(50)]
        public string? Name { get; set; }

        public InvoiceCustomerDTO? InvoiceCustomer { get; set; }

        public IEnumerable<ItemDTO>? Items { get; set; }
    }
}
