namespace Invoeasy.Definitions.Models
{
    public class Customer : EntityBase
    {
        public required string Name { get; set; }
        public string? Address { get; set; }
    }
}
