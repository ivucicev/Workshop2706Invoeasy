using FluentValidation;
using Invoeasy.BLL.CQRS.Commands.Invoice;

namespace Invoeasy.BLL.CQRS.Validators
{
    public class CreateInvoiceCommandValidator : AbstractValidator<CreateInvoiceCommand>
    {
        public CreateInvoiceCommandValidator()
        {
            RuleFor(x => x.Model.Name).NotEmpty();
            RuleFor(x => x.Model.Number).NotEmpty();
        }
    }
}
