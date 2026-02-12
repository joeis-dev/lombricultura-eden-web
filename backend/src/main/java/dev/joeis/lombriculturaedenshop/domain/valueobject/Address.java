package dev.joeis.lombriculturaedenshop.domain.valueobject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address implements Serializable {

    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String additionalInfo;

    public String getFullAddress() {
        return String.format("%s, %s, %s %s, %s",
            street != null ? street : "",
            city != null ? city : "",
            state != null ? state : "",
            postalCode != null ? postalCode : "",
            country != null ? country : ""
        ).replaceAll(",\\s*,", ",").trim();
    }

    public boolean isComplete() {
        return street != null && !street.isBlank() &&
               city != null && !city.isBlank() &&
               state != null && !state.isBlank() &&
               postalCode != null && !postalCode.isBlank() &&
               country != null && !country.isBlank();
    }
}
