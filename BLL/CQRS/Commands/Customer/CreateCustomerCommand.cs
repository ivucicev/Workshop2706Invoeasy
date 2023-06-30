using Invoeasy.DAL.Context;
using Invoeasy.Definitions.BM;
using Mapster;
using MediatR;

namespace Invoeasy.BLL.CQRS.Commands.Customer
{
    public record CreateCustomerCommand(CustomerDTO? Model) : IRequest<CustomerDTO>;

    public class CreateCustomerCommandHandler : IRequestHandler<CreateCustomerCommand, CustomerDTO>
    {
        private readonly IMediator mediator;
        private readonly InvoeasyDB ctx;

        public CreateCustomerCommandHandler(IMediator mediator, InvoeasyDB ctx)
        {
            this.mediator = mediator;
            this.ctx = ctx;
        }

        public async Task<CustomerDTO> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {

            var customer = new Definitions.Models.Customer() { Name = request.Model.Name };
            customer.Address = request.Model.Address;

            ctx.Customer.Add(customer);
            await ctx.SaveChangesAsync();

            return customer.Adapt<CustomerDTO>();

        }
    }
}
