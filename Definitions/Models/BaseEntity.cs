using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Invoeasy.Definitions.Models
{
    public class EntityBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; }

        [Required]
        public DateTimeOffset ModifiedAt { get; set; }

        [Required]
        public DateTimeOffset ReadAt { get; set; }

        [Required]
        public bool Active { get; set; }


        [StringLength(2000)]
        public string? Description { get; set; }

    }
}
