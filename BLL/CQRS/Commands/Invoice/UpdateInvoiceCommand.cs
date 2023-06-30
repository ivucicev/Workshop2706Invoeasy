using Invoeasy.BLL.CQRS.Commands.Customer;
using Invoeasy.BLL.CQRS.Events;
using Invoeasy.DAL.Context;
using Invoeasy.Definitions.BM;
using Invoeasy.Definitions.DTO;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Invoeasy.BLL.CQRS.Commands.Invoice
{
    public record UpdateInvoiceCommand(Guid Id, InvoiceBM Model) : IRequest<InvoiceDTO>;

    public class UpdateInvoiceCommandHandler : IRequestHandler<UpdateInvoiceCommand, InvoiceDTO>
    {
        private readonly IMediator mediator;
        private readonly InvoeasyDB ctx;

        public UpdateInvoiceCommandHandler(IMediator mediator, InvoeasyDB ctx)
        {
            this.mediator = mediator;
            this.ctx = ctx;
        }

        public async Task<InvoiceDTO?> Handle(UpdateInvoiceCommand request, CancellationToken cancellationToken)
        {

            await ctx.Database.BeginTransactionAsync();

            var invoice = await ctx.Invoice.Include(i => i.Items).FirstOrDefaultAsync(i => i.Id == request.Id);

            if (invoice == null) return null;

            invoice = request.Model.Adapt(invoice);

            // if invoice customer has customer ID should use existing custoomer
            // if invoice customer does not have customer iD create new
            invoice.InvoiceCustomer = new Definitions.Models.InvoiceCustomer();
            invoice.InvoiceCustomer.Address = request.Model.InvoiceCustomer.Address;
            invoice.InvoiceCustomer.Name = request.Model.InvoiceCustomer.Name;

            if (request.Model.InvoiceCustomer?.CustomerId != null)
            {
                invoice.InvoiceCustomer.CustomerId = (Guid)request.Model.InvoiceCustomer.CustomerId;
            }
            else
            {
                // create new customer and map it to the invoice customer
                var customer = await mediator.Send(new CreateCustomerCommand(new CustomerDTO() { Name = request.Model.InvoiceCustomer.Name, Address = request.Model.InvoiceCustomer.Address }));
                invoice.InvoiceCustomer.CustomerId = (Guid)customer.Id;
            }

            invoice.Items = null;

            await ctx.SaveChangesAsync();
            await ctx.Database.CommitTransactionAsync();

            await mediator.Publish(new InvoiceUpdatedEventNotification(request.Id, request.Model.Items));

            return invoice.Adapt<InvoiceDTO>();

        }
    }
}
