using FluentValidation;
using Invoeasy.BLL.CQRS.Queries.Invoice;

namespace Invoeasy.BLL.CQRS.Validators
{
    public class GetAllInvoicesQueryValidator : AbstractValidator<GetAllInvoicesQuery>
    {
        public GetAllInvoicesQueryValidator()
        {
        }
    }
}
