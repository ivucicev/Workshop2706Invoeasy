using Invoeasy.DAL.Context;
using Invoeasy.Definitions.BM;
using Mapster;
using MediatR;

namespace Invoeasy.BLL.CQRS.Commands.Customer
{
    public record CreateCustomerCommand(CustomerBM? Model) : IRequest<CustomerBM>;

    public class CreateCustomerCommandHandler : IRequestHandler<CreateCustomerCommand, CustomerBM>
    {
        private readonly IMediator mediator;
        private readonly InvoeasyDB ctx;

        public CreateCustomerCommandHandler(IMediator mediator, InvoeasyDB ctx)
        {
            this.mediator = mediator;
            this.ctx = ctx;
        }

        public async Task<CustomerBM> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {

            var customer = new Definitions.Models.Customer() { Name = request.Model.Name };
            customer.Address = request.Model.Address;

            ctx.Customer.Add(customer);
            await ctx.SaveChangesAsync();

            return customer.Adapt<CustomerBM>();

        }
    }
}
